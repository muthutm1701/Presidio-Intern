import React from 'react';

export default class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      data: null,
      count: 0,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        signal: this.abortController.signal,
      });
      const json = await res.json();
      this.setState({ data: json });
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Count changed ->', this.state.count);
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { data, count } = this.state;
    const name = this.props.name || 'Muthu';

    return (
      <div>
        <h1>hi hello</h1>
        <h1>class based component</h1>
        <h1>hi, {name}</h1>

        <div>
          <strong>Count:</strong> {count}
          <button onClick={() => this.setState((prev) => ({ count: prev.count + 1 }))}>
            Increase
          </button>
        </div>

        <div>
          <h3>Fetched data:</h3>
          {data ? (
            <div>
              <p><strong>id:</strong> {data.id}</p>
              <p><strong>title:</strong> {data.title}</p>
              <p><strong>body:</strong> {data.body}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}
