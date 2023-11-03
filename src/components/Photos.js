import React, { useEffect} from "react";
import NavBar from "./NavBar";

function Photos(props){

    console.log('props.photosData',props.photosData);
    if (!props.photosData || !props.photosData.items) {
        return null;
    }

    const items = props.photosData.items;

    // Define the number of columns
    const numColumns = 3;
    // Calculate the number of items in each column
    const itemsPerColumn = Math.ceil(items.length / numColumns);

    // Create an array of columns, where each column is an array of items
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
        const startIndex = i * itemsPerColumn;
        const endIndex = startIndex + itemsPerColumn;
        columns.push(items.slice(startIndex, endIndex));
    }

    return (
        <div className="container">
            <div className="row">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="col-md-4">
                        <div className="column">
                            {column.map((item, itemIndex) => (
                                <div key={itemIndex} className="photo-item mb-3">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        <img src={item.link} alt={item.title} className="img-fluid" style={{
                        border: '8px solid black', // Add the black border
                      }}/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Photos;