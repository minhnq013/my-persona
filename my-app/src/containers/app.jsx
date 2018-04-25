import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createEntityAsync,
  queryEntityAsync,
  deleteEntityAsync,
  testGraphQl,
} from '../actions/entity_actions';

class App extends React.Component {
  static propTypes = {
    mangas: PropTypes.arrayOf(PropTypes.object),
    createManga: PropTypes.func.isRequired,
    queryManga: PropTypes.func.isRequired,
    deleteManga: PropTypes.func.isRequired,
  };

  static defaultProps = {
    mangas: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      newManga: {},
    };

    this.handleMangaTitleChange = this.handleMangaTitleChange.bind(this);
  }

  componentWillMount() {
    // this.props.queryManga();
    this.props.queryManga(`
    query AllMangas {
      mangas {
        title
      }
    }
    `);
  }

  handleMangaTitleChange(event) {
    this.setState({
      newManga: {
        title: event.target.value,
      },
    });
  }

  render() {
    const mangas = this.props.mangas || [];
    const mangasList = mangas.map(item => (
      <li key={item.id}>
        {item.title}&nbsp;
        <button onClick={() => this.props.deleteManga(item.id)}>Delete</button>
      </li>
    ));

    return (
      <div>
        <h1>App</h1>
        <h4>Create Manga</h4>
        <div>
          Manga Name:
          <input onChange={this.handleMangaTitleChange} />
        </div>
        <button onClick={() => this.props.createManga(this.state.newManga)}>Submit</button>
        <h3>Manga List</h3>
        <ul>{mangasList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mangas: state.entity.manga,
});

const mapDispatchToProps = dispatch => ({
  createManga: entity => dispatch(createEntityAsync('manga', entity)),
  queryManga: parameters => dispatch(queryEntityAsync('manga', parameters)),
  deleteManga: entityId => dispatch(deleteEntityAsync('manga', entityId)),
  testGraphQl: queryString => dispatch(testGraphQl(queryString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
