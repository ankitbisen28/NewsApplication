import React, { Component } from 'react';
import NewsItem from '../NewsItem';

export class News extends Component {

  constructor(){
    super();
    this.state = {
        articles: [],
        loading: false, 
        page:1 
    }
  }

  async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e25693324c8040dc899f50b77497ddef";
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({articles: parsedData.articles})
  }

  handlePrevClick = async ()=> {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e25693324c8040dc899f50b77497ddef&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles
    })
  }
  
  handleNextClick = async ()=> {
    console.log("Next");
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=e25693324c8040dc899f50b77497ddef&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
          page:this.state.page + 1,
          articles: parsedData.articles
        })
    
  }

  render() {
    return (
    <div className='container my-3'>
      <h1 className='my-3'>NewsMonkey - Top Headlines</h1>
      <div className="row">
      {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>  
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>	&#8592; Previous</button>
        <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next 	&#8594;</button>
      </div>
    </div>
    )
  }
}

export default News;
