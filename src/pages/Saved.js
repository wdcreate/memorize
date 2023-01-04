import  {React, Component} from "react";
import { SavedList } from "../components/SavedList";

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data : SavedList,
     }
  }
  render() { 
   const sl = this.state.data.map((sl) => {
      return (
        <div className="saved-card">
            <p>{sl.word}</p>           
            <p>{sl.translate}</p>           
            <p>{sl.note}</p>           
        </div>
      )
    });
    return ( 
      <div>
        <h2>Saved list</h2>
        <div className="saved-inner">
          <div className="saved-list">
          {sl}
          </div>
        </div>
      </div>
     );
  }
}
 
export default Saved;