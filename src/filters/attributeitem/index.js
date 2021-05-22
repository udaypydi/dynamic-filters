import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { IconButton } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FilterContext } from "../index";
import { CATEGORIES, NUMERIC_FIELDS } from "./constants";
// import "./styles.css";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AttributeItem(props) {
  const [relation, setRelation] = useState([]);
  // const [attributeData, setAttribute] = useState(props.attributeData)
  const [attributeValues, setAttributeValues] = useState([]);
  const [searchAttributeValues, setSearchAttributeValues] = useState('');
  const [showFirstIndexErrors, setShowFirstIndexErrors] = useState(false);
  
  const { elementIndex, attributeId, attributeData} = props;

  // useEffect(() => {
  //   setAttribute(props?.attributeData);
  // }, [props?.attributeData]);

  const { 
    onFilterChange, 
    onAddFilterItem, 
    deleteFilter,
    onClearAttributes,
    showErrors,
    attributesValueURL,
  } = useContext(FilterContext);

  function validateData(data) {
    const { attribute, relation, values } = data;
    const attr = {...data};
    if (!attribute || !relation || !values.length) {        
      attr.isValid = false;
    } else {
      attr.isValid = true;
      // setIsValid(true);
    }
    return attr;
  }

  function onAttributeChange(value, key) {
    const attrData = {...attributeData};
    attrData[key] = value;

    if (key === 'attribute') {
      fetchRelationType(value);
      attrData['relation'] = '';
    }

    if(key !== 'values') {
      attrData['values'] = [];
    }
    
    onFilterChange({ attrData: validateData(attrData), elementIndex });
  }

  function fetchAttributeValues() {
    fetch(`${attributesValueURL}?attribute=${encodeURIComponent(attributeData?.attribute)}`)
      .then(res => res.json())
      .then(json => {
        setAttributeValues(json);
      })
  }

  function fetchRelationType(value) {

    if(NUMERIC_FIELDS.includes(value)) {
      setRelation(['isEqual (=)', 'greater than(>)', 'less than(<)']);
    } else {
      setRelation(['includes']); 
    }
  }

  function shouldShowErrors(key) {
    return ((showFirstIndexErrors &&  showErrors && !attributeData[key]?.length)|| (elementIndex !== 0 && showErrors && !attributeData[key]?.length));
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: 20
    }}
    key={attributeData?.attrId}
    >
      <Autocomplete
        size="small"
        disableClearable
        onChange={(event, newValue) => {
          onAttributeChange(newValue, 'attribute');
        }}
        inputValue={attributeData?.attribute}
        onInputChange={(event, newInputValue) => {
          onAttributeChange(newInputValue, 'attribute');
        }}
        id="controllable-states-demo"
        options={CATEGORIES}
        style={{ width: 150 }}
        renderInput={(params) => (
          <TextField
            error={shouldShowErrors('attribute')}
            {...params}
            label="Attribute"
            variant="outlined"
          />
        )}
      />
      <Select 
        size="sm"
        options={relation}
        value={attributeData?.relation || ' '}
        style={{ width: 200 }}
        error={shouldShowErrors('relation')}
        renderValue={(value) => <label>{value}</label>}
      >
        {
          relation.map(data => (
            <MenuItem 
              value={data}
              onClick={() => {
                if (data === 'includes') {
                  fetchAttributeValues();
                }
                onAttributeChange(data, 'relation');
              }}
            >{data}</MenuItem>
          ))
        }
      </Select>
      {
        attributeData?.relation === 'includes' ? (
          <Autocomplete
            size="small"
            disableClearable
            onChange={(event, newValue) => {
              onAttributeChange(newValue, 'values');
            }}
            inputValue={searchAttributeValues}
            onInputChange={(event, newInputValue) => {
              setSearchAttributeValues(newInputValue)
            }}
            id="controllable-states-demo"
            options={attributeValues}
            style={{ width: 150 }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </React.Fragment>
            )}
            multiple
            renderInput={(params) => (
              <TextField
                error={false}
                {...params}
                label="Attribute"
                variant="outlined"
              />
            )}
        />
        ) : (
          <input 
            style={{ 
              padding: 10, 
              width: 200, 
              border: '1px solid #ccc',
              borderColor: shouldShowErrors('values') ? 'red' : '#ccc' 
            }} 
            type="number"
            value={attributeData?.values[0]}
            onChange={event => {
              onAttributeChange(event?.target?.value ? [event?.target?.value] : [], 'values');
            }}
            placeholder="0000"
          />
        )
      }
      <div style={{ width: 100 }}>
        {
          elementIndex === 0 ? (
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CancelIcon 
                style={{ 
                  color: 'red', 
                  cursor: 'pointer' 
                }}
                onClick={() => {
                  onClearAttributes(elementIndex);
                }} 
              />
              <CheckCircleIcon 
                style={{ 
                  color: 'green', 
                  marginLeft: 10,
                  cursor: 'pointer' 
                }} 
                onClick={() => {
                  setShowFirstIndexErrors(elementIndex === 0 && !attributeData?.isValid)
                  onAddFilterItem(validateData(attributeData), elementIndex)
                }}
              />
            </div>
          ) : (
            <DeleteIcon
              onClick={(event) => {
                  deleteFilter(elementIndex);
              }}
              style={{ color: "red", marginRight: "5px", cursor: 'pointer' }}
            />
          )
        }
      </div>
    </div>
  );
}

export default AttributeItem;
