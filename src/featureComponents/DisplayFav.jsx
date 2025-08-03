import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const DisplayFav = () => {
  const queryClient = useQueryClient();
  const [fav, setFav] = useState([]);

  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_TOKEN,
      },
    });
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return res.json();
  };

  const queryAirTable = useQuery({
    queryKey: ["airTable"],
    queryFn: getData,
  });

  return (
    <>
      {JSON.stringify(queryAirTable.data)}
      <div>Fav</div>
    </>
  );
};

export default DisplayFav;
