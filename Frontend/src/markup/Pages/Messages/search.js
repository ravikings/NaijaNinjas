import React from 'react'
import SearchChat from './SearchChat';
const Search = (props) => {
    const {searchText,dat} = props;
    // console.log(dat?.data.count >= 1)
    if(dat?.data?.count > 0 ){
        
        dat?.data?.results?.map((item,kx) => {
            console.log(item);
            return (<SearchChat user={item} />)
        })
        
    }
    
    return (
        <div className="row">
            <div className="col-12 mt-4">
                <h6 className="text-muted text-center">No search Found</h6>
            </div>
            </div> 
    ) 
    
        
        
}

export default Search
