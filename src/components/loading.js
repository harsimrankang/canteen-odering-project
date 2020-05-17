import React, { Component } from "react";
import "./loading.css";
class Loading extends Component {
    render() {
        return (
            <div>
                <div class="center">
                    <div class="title">{this.props.text ? this.props.text : ""}</div>
                    <div class="refresh">
                        <div class="circle blue"></div>
                        <div class="circle blue"></div>
                        <div class="circle blue"></div>
                        <div class="circle blue"></div>
                        <div class="circle blue"></div>
                    </div>
                    <div class="list"></div>
                </div>
            </div>
        );
    }
}

export default Loading;
