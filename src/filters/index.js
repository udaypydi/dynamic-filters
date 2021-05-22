import React, { useState, useEffect } from "react";
import { Select, Menu, MenuItem } from "@material-ui/core";
import { nanoid } from 'nanoid';
import _ from 'lodash';
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "./modal";

export const FilterContext = React.createContext(null);

function Filters(props) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [attributeList, setAttributeList] = useState(props?.attributeData);
  const [showErrors, setShowErrors] = useState(false);
  const { options, customStyle, getFilterData, attributesValueURL } = props;

  const { Provider } = FilterContext;

  function onFilterChange(data) {
    const { attrData, elementIndex } = data;

    const attrList = [...attributeList];
    attrList[elementIndex] = attrData;
    setAttributeList(attrList);
  } 

  function onAddFilterItem(attributeData, elementIndex) {
    if (attributeData?.isValid) {
        const attrList = [...attributeList];
        attrList[elementIndex] = attributeData; 
        setShowErrors(false);
        setAttributeList([
            { attrId: nanoid(), values: [], attribute: "", relation: "", isValid: false },
            ...attrList
        ]);
    } else {
        setShowErrors(true);
    }
  } 

  function deleteFilter(elementIndex) {
    const attrList = [...attributeList];
    attrList.splice(elementIndex, 1);
    setAttributeList(attrList);
  }

  function onClearAttributes(elementIndex) {
    const attrList = [...attributeList];
   
    attrList[0] = { ...attrList[0], relation: '', attribute: '', values: []};

    setAttributeList(attrList);
  }

  function applyFilters(flag) {
    const attrList = [...attributeList];
    attrList.splice(0, 1);
    const errors =  _.filter(attrList, { isValid: false });
    setShowErrors(errors?.length);
    getFilterData({ attrList, actionType: flag, isValid: !errors.length });
  }

  return (
    <Provider value={{ 
        onFilterChange, 
        attributeList, 
        onAddFilterItem,
        deleteFilter,
        onClearAttributes,
        showErrors,
        attributesValueURL,
        actionType,
        applyFilters,
    }}>
        <Select
            labelId="filter-label"
            id="filter-setup"
            renderValue={(value) => <label>{value}</label>}
            label="Filter"
            style={customStyle}
            >
            <MenuItem
                value="Add Filter"
                style={{ width: 200 }}
            >
                <div
                    style={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: 200,
                    background: "#fff",
                    padding: 8,
                    borderBottom: "1px solid #ccc"     
                    }}
                    onClick={(event) => {
                        setAttributeList([
                        { attrId: nanoid(), values: [], attribute: "", relation: "", isValid: false, index: 0 }
                        ]);
                        setShowModal(true);
                        setActionType('ADD');
                        event.stopPropagation();
                    }}
                >
                    <AddIcon /> Add Filter
                </div>
            </MenuItem>

            {options?.map((option) => (
                <MenuItem style={{ padding: 0, width: 200 }}>
                <div
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 200,
                    background: "#fff",
                    padding: 8,
                    borderBottom: "1px solid #ccc"
                    }}
                >
                    <p style={{ margin: 0, marginLeft: 20 }}>{option?.name}</p>
                    <div>
                    <IconButton aria-label="edit" style={{ padding: "0" }}>
                        <EditIcon
                        onClick={(event) => {
                            setShowModal(true);
                            setActionType('EDIT');
                            event.stopPropagation();
                        }}
                        style={{ color: "rgb(93 156 236)", marginRight: "5px" }}
                        />
                    </IconButton>
                    <IconButton aria-label="edit" style={{ padding: "0" }}>
                        <DeleteIcon
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                            style={{ color: "red", marginRight: "5px" }}
                        />
                    </IconButton>
                    </div>
                </div>
                </MenuItem>
            ))}

        
                {showModal && (
                <Modal
                    onModalClose={() => {
                    setShowModal(false);
                    }}
                />
                )}
            
        </Select>
    </Provider>
  );
}

export default Filters;
