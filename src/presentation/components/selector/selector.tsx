import React, { useContext, useState, PropsWithChildren } from "react";
import Styles from "./selector-styles.scss";
import Select from "@/presentation/components/select/select";
import { LeagueList } from "@/presentation/test/league-test1";

interface Props {
  data?: LeagueList
}

export const selectName = [
  'Select Operator',
  'Select Game Type',
  'Select State Name'
]

const Selector = ({ data }: PropsWithChildren<Props>) => {

  return (
    <div className={Styles.selectorBox} >
      {selectName.map((selectDefault) => (
        <Select key={selectDefault} data={data}>
          {selectDefault}
        </Select>
      ))}
    </div>
  );
};

export default Selector;
