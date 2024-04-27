import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";

import DefaultLayoutApp from "../../components/layout/DefaultLayoutApp";
import RouteApiList from "../../components/Ui/List/RouteApiList";
import JsonBuilder from "../../components/Ui/Other/ApiJsonBuilder";

export default function RouteList() {
  const [projectId, setProjectId] = useState(null);
  const [projectDataArray, setProjectDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setDate] = useState([
    {
      type: "default",
      typeId: 1,
      name: "companyName",
      value: "faker.company.name()",
    },
    {
      type: "array",
      typeId: 2,
      name: "nestedData",
      value: [
        {
          type: "default",
          typeId: 1,
          name: "nestedCompanyName1",
          value: "faker.company.name()",
        },
        {
          type: "default",
          typeId: 1,
          name: "nestedCompanyName2",
          value: "faker.company.name()",
        },
        {
          type: "array",
          typeId: 2,
          name: "nestedInnerData",
          value: [
            {
              type: "default",
              typeId: 1,
              name: "innerCompanyName1",
              value: "faker.company.name()",
            },
            {
              typeId: 1,
              type: "default",
              name: "innerCompanyName2",
              value: "faker.company.name()",
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const url = window.location.href;
    const urlArray = url.split("/");
    const projectIdUrl = urlArray[urlArray.length - 1];
    setProjectId(projectIdUrl);

    axios
      .request({
        method: "GET",
        url: "http://localhost:3001/routes/get-route/" + projectIdUrl,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log(response);
        setProjectDataArray(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <DefaultLayoutApp>
      <main className="flex-grow p-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex space-x-5">
            <div className="w-[15%]">
              <RouteApiList />
            </div>
            <div className="w-[55%]">
              <JsonBuilder data={data} />
            </div>
            <div className="w-[30%] bg-[#0c0d0e] p-3">
              <ReactJson theme={"brewer"} src={data} />
            </div>
          </div>
        )}
      </main>
    </DefaultLayoutApp>
  );
}
