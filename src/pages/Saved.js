import  {React, Component} from "react";

class Saved extends Component {
  removePeople(e) {
    this.setState({data: this.props.data.filter(function(card) { 
        return card !== e.target.value 
    })});
}
  render() { 
   const sl = this.props.data.map((sl, i) => {
      return (
        <div className="saved-card" key={i}>
          <div className='content'>
            <p>{sl.word}</p>           
            <p>{sl.translate}</p>           
            <p>{sl.note}</p>           
          </div>
          <div className='btn-block'>
            <button className='delete-btn'>delete</button>
            <button className='redo-btn'>redo</button>
          </div>
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