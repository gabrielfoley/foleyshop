import { useState, useEffect, useMemo } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userRequest } from "../../requestMethods";
import "./home.css";

export default function Home() {
  const [ userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
      []
  );

useEffect(()=>{
  const getStats = async ()=> {
    try{
        const res = await userRequest.get("/users/stats");
        const drop = res.data.sort((a,b) =>{
          return a._id - b._id
        })
        drop.map((item) => 
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
    }catch{}
  };
  getStats();
},[MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart 
      data={userStats} aspect={4/1} title="User Analytics" dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
