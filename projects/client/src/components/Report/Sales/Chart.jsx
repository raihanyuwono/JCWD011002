import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import SalesCard from "./SalesCard";

const Charts = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/sales/monthly`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const labels = data.map((item) => `${item.month} ${item.year}`);
      const totalSales = data.map((item) =>
        parseInt(item.total_sales_per_month)
      );

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Yearly Sales",
              data: totalSales,
              backgroundColor: "#34638A",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "white",
              },
            },
            x: {
              ticks: {
                color: "white",
              },
            },
          },
          plugins: {
            datalabels: {
              color: "#ffffff",
              anchor: "end",
              align: "end",
              offset: -5,
              font: {
                weight: "bold",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <>
      <Box mb={2} w={"80vw"} borderRadius={"10px"}>
        <canvas
          style={{ backgroundColor: "#393939", padding: "20px" }}
          ref={chartRef}
          width={"full"}
          height={100}
        ></canvas>
      </Box>
      <SalesCard />
    </>
  );
};

export default Charts;
