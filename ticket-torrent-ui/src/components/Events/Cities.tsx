import { useQuery } from "@tanstack/react-query";

import { fetchAllCities } from "../../utils/https";
import { ChangeEvent } from "react";

const Cities = ({
  forSearch,
  inputClass,
  cityId,
  changeHandler,
}: {
  forSearch: boolean;
  inputClass: string;
  cityId?: string;
  changeHandler?: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["images"],
    queryFn: ({ signal }) => fetchAllCities({ signal }),
    staleTime: 1000 * 60 * 30,
  });
  let content;
  if (data) {
    if (forSearch && data?.length && data[0].id !== "__all__") {
      data.unshift({ id: "__all__", name: "All Cities" });
    }
    content = data?.map((city: { id: string; name: string }) => (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    ));
  }
  return (
    <>
      {!forSearch && (
        <label htmlFor="cityId" className="text-xl">
          City {isPending ? " (loading cities..)" : ""}
        </label>
      )}
      <select
        name="cityId"
        id="cityId"
        disabled={isPending}
        className={`${inputClass} md:w-[200px] py-1.5`}
        defaultValue={cityId}
        onChange={changeHandler ? changeHandler : () => {}}
      >
        {content}
      </select>
      {!forSearch && isError && <p>{error.message}</p>}
    </>
  );
};

export default Cities;
