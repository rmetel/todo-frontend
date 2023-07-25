import { useEffect, useState } from "react";
import { getApiUrl } from "helpers";
import { Api } from "models/Api";

export const useApi = (): Api => {
  const [api, setApi] = useState<Api>({
    id: null,
    branch: "",
    version: "",
    deployed: false
  });

  useEffect(() => {
    fetch(getApiUrl() + "/version")
      .then(response => response.json())
      .then(api => setApi(api));
  }, []);

  return api;
}