import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class index extends Component {

    search = async () => {
        
        // 获取用户的输入（连续解构赋值+重命名）
        const {keywordElement:{value:keyword}} = this;
        // 发送请求前通知List更新状态
        PubSub.publish('brother', {isFirst:false, isLoading:true})
        /* // /api1必须紧随端口号
        axios.get(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
            response => {
                // 请求成功后通知List更新状态
                PubSub.publish('brother', {isLoading:false, users:response.data.items})
            },
            error => {
                // 请求失败后通知List更新状态
                PubSub.publish('brother', {isLoading:false, err:error.message})
            }
        ) */

        // 发送网络请求---使用fetch发送（未优化版本）
        /* fetch(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
            response => {
                console.log('联系服务器成功了');
                // 返回一个Promise实例对象
                return response.json();
            },
            error => {
                console.log('联系服务器失败了', error);
                // 返回一个初始化状态的Promise实例，终止Promise链执行
                return new Promise(() => {});
            }
        ).then(
            response => {
                console.log('获取数据成功了', response);
            },
            error => {console.log('获取数据失败了', error);}
        ) */
        
        // 发送网络请求---使用fetch发送（优化版本1）
        /* fetch(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
            response => {
                console.log('联系服务器成功了');
                // 返回一个Promise实例对象
                return response.json();
            }
        ).then(
            response => {
                console.log('获取数据成功了', response);
            }
        ).catch(
            // 统一处理异常
            (error) => {console.log('请求出错', error);}
        ) */

        // 发送网络请求---使用fetch发送（优化版本2）
        
        try {
            const response = await fetch(`http://localhost:3000/api1/search/users?q=${keyword}`)
            const data = await response.json()
            console.log(data)
            // 请求成功后通知List更新状态
            PubSub.publish('brother', {isLoading:false, users:data.items})
        }catch(error) {
            console.log('请求出错', error)
            // 请求失败后通知List更新状态
            PubSub.publish('brother', {isLoading:false, err:error})
        }
    }

    render() {
        return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
            <input type="text" ref={c => this.keywordElement = c} placeholder="enter the name you search"/>&nbsp;
            <button onClick={this.search}>Search</button>
            </div>
        </section>
        )
    }
}
