import UnderDevelopment from "@/components/common/UnderDevelopment";
import { AreaChart, BarChart, DonutChart, PieChart } from "@mantine/charts";

const OverViewPage = () => {
  const data = [
    {
      date: "Mar 22",
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: "Mar 23",
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: "Mar 24",
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: "Mar 25",
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: "Mar 26",
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];

  const barChartData = [
    { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];

  const pieChartData = [
    { name: "USA", value: 400, color: "indigo.6" },
    { name: "India", value: 300, color: "yellow.6" },
    { name: "Japan", value: 300, color: "teal.6" },
    { name: "Other", value: 200, color: "gray.6" },
  ];
  return (
    <div>
      <div>
        <UnderDevelopment />
      </div>
      <div className="p-5 lg:p-10 grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10">
        {/* <div>
          <PieChart
            withLabelsLine
            labelsPosition="inside"
            labelsType="value"
            withLabels
            data={pieChartData}
          />
        </div> */}
        {/* <div>
          <DonutChart withLabelsLine withLabels data={pieChartData} />
        </div> */}
        <div>
          <AreaChart
            h={300}
            data={data}
            dataKey="date"
            series={[
              { name: "Apples", color: "indigo.6" },
              { name: "Oranges", color: "blue.6" },
              { name: "Tomatoes", color: "teal.6" },
            ]}
            curveType="linear"
          />
        </div>
        <div>
          <BarChart
            h={300}
            data={barChartData}
            dataKey="month"
            series={[
              { name: "Smartphones", color: "violet.6" },
              { name: "Laptops", color: "blue.6" },
              { name: "Tablets", color: "teal.6" },
            ]}
            tickLine="xy"
            gridAxis="xy"
          />
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
