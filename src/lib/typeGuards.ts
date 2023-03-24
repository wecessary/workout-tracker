import { SetWithStats } from "../model/model";

export const isSetWithStats = (
    set: SetWithStats | undefined
  ): set is SetWithStats => {
    return !!set; // this lets typescript know to narrow down the type to SetWithStats if it returns true
    // otherwise the return type of set will still be SetWithStats | undefined
  };