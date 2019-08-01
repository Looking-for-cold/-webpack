import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Route from './routes';
import "antd/dist/antd.css";
class App extends Component{
    render(){
        return(
            <Route />
        )
        
    }
}
ReactDom.render(<App />,document.getElementById('root'));