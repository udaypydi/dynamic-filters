import React, { useContext, useState } from 'react';
import { FilterContext } from '../index';

function Footer() {
  const [checked, setChecked] = useState(false);

  const { actionType, applyFilters } = useContext(FilterContext);

  return (
    <div 
        style={{ 
            display: 'flex', 
            width: '100%', 
            alignItems: 'center', 
            justifyContent: 'flex-end' 
        }}
    >
          {
              actionType === 'ADD' ? (
                  <>
                    <input 
                        type="checkbox" 
                        checked={checked}
                        onChange={e => {
                            setChecked(e.target.checked)
                        }}
                    />
                    <label style={{ color: '#0d93e0' }}>Save</label>
                  </>  
              ) : (
              <button
                style={{ 
                    width: 100, 
                    padding: 10, 
                    background: '#fff',
                    color: '#0d93e0',
                    border: '1px solid #0d93e0',
                }}
                onClick={() => {
                    applyFilters('SAVE');
                }}
              >
                  Save
              </button>
            )
          }
          <button 
            style={{ 
                width: 100, 
                padding: 10, 
                background: '#0d93e0',
                color: '#fff',
                border: 'none',
                marginLeft: 10
            }}
            onClick={() => {
                if (actionType === 'ADD' && checked) {
                    applyFilters('SAVE_APPLY')
                } else {
                    applyFilters('APPLY');
                }
                
            }}
            >Apply</button>
      </div>    
  )

}

export default Footer;
