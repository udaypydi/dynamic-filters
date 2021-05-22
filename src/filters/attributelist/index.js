import React, { useState } from "react";
import { FilterContext } from "../index";
import AttributeItem from "../attributeitem";

function AttributeList(props) {
  const { attributeList, getFilterData } = React.useContext(FilterContext);

  return <div>{
      attributeList?.map((attribute, index) => (
        <div key={attribute?.attrId}>
          <AttributeItem attributeData={attribute} elementIndex={index} />
        </div>  
      ))
    }</div>;
}

export default React.memo(AttributeList);
