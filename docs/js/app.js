class ProductList extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.setState({
      products: Seed.products
    });
  }

  handleProductUpVote = (id, e) => {
    // console.log("upvote ", id, e, this);
    this.setState({
      products: this.state.products.map(
        p => (p.id === id ? Object.assign({}, p, { votes: p.votes + 1 }) : p)
      )
    });
  };

  render() {
    const products = this.state.products
      .map(p => p)
      .sort((a, b) => b.votes - a.votes)
      .map(
        ({
          id,
          title,
          description,
          url,
          votes,
          submitterAvatarUrl,
          productImageUrl
        }) => (
          <Product
            key={id}
            id={id}
            title={title}
            description={description}
            url={url}
            votes={votes}
            avatar={submitterAvatarUrl}
            image={productImageUrl}
            onVote={this.handleProductUpVote}
          />
        )
      );
    return <div>{products}</div>;
  }
}

class Product extends React.Component {
  render() {
    const {
      id,
      title,
      description,
      url,
      votes,
      avatar,
      image,
      onVote
    } = this.props;
    return (
      <div className="product">
        <div className="product__img-frame">
          <img src={image} alt={title} />
        </div>
        <div className="product__content">
          <div className="product__vote">
            <i className="fas fa-caret-up" onClick={e => onVote(id, e)} />
            <span>{votes}</span>
          </div>
          <div className="product__description">
            <a href={url}>{title}</a>
            <p>{description}</p>
          </div>
          <div className="product__extra">
            <span>Submitted by: </span>
            <img className="product__avatar" src={avatar} alt="Avatar" />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("app"));
