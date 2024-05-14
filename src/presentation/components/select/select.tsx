import React, { useContext, useState, PropsWithChildren, useEffect } from "react";
import Styles from "./select-styles.scss";
import ContextState from '@/presentation/contexts/tests/test1-context';
import ContextFilterData from '@/presentation/contexts/tests/test1-data-context';
import { League } from "@/presentation/test/league-test1";
import { selectName } from "../selector/selector";
import { FilterState } from "@/presentation/pages/test-totem/test1";

interface Props {
  styles?: React.CSSProperties;
  data?: League[]
}

interface SelectedState {
  key: string
  value: string
}

export type SetFilter = React.Dispatch<React.SetStateAction<FilterState>>;

export const Select = ({
  children,
  data
}: PropsWithChildren<Props>) => {

  const { filter, setFilter }: { filter: FilterState, setFilter: SetFilter }
    = useContext(ContextState) // contexto criado em Test1

  const [selected, setSelected] = useState<SelectedState>({
    key: '',
    value: '',
  });

  const textChildren = React.Children.toArray(children).join('')
  let stateSelected = textChildren.replace(/\s/g, '')

  // CHANGE SELECT
  const handleSelectChange = (event) => {
    setSelected({
      ...selected,
      key: stateSelected,
      value: event.target.value,
    });
  };

  // Função para renderizar as opções do selectName
  const renderOptionsBySelect = (selectName) => {

    let optionsBySelectName = []
    switch (selectName) {
      case "Select Operator":
        optionsBySelectName = Array.from(new Set(data.map((item: League) => item.operatorGameType)));
        break;
      case "Select Game Type":
        optionsBySelectName = Array.from(new Set(data.map((item: League) => item.operatorName)));
        break;
      case "Select State Name":
        optionsBySelectName = Array.from(new Set(data.map((item: League) => item.operatorSlateId)));
        break;
    }

    return optionsBySelectName.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
  };

  useEffect(() => {

    const filterData = data.filter((item) => {
      if (selected.key == 'SelectOperator' && item.operatorGameType == selected.value) {
        return item
      }
      if (selected.key == 'SelectGameType' && item.operatorName == selected.value) {
        return item
      }
      if (selected.key == 'SelectStateName' && item.operatorSlateId.toString() == selected.value) {
        return item
      }
    });

    setFilter({
      ...filter,
      data: filterData,
      page: 1,
      playersPage: null
    })

  }, [selected]);

  return (
    <div>
      <select
        className={`${Styles.selectorBox}`}
        id="optionId"
        name="value"
        value={selected.value}
        onChange={handleSelectChange}
      >
        <option value="">{children}</option>
        {renderOptionsBySelect(children)}

      </select>
    </div>
  );
};

export default Select;