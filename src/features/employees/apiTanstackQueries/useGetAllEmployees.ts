import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/honoClient/client";

export const useGetAllEmployees = () => {
    const query = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const response = await client.api.employees.$get();

            if(!response.ok){
                throw new Error("Failed to fetch employees list");
            }

            const {data} = await response.json();
            return data;
        }
    });

    return query;
}