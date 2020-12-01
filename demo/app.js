import React, { Component } from 'react';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from '../index';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        { title: '.gitignore' },
        { title: 'package.json' },
        {
          title: 'src',
          expanded: true,
          children: [
            { title: 'styles.css',
              children: [
                { title: 'styles_child.css' }
              ]
            },
            { title: 'index.js' },
            { title: 'reducers.js' },
            { title: 'actions.js' },
            { title: 'utils.js' },
          ],
        },
        {
          title: 'tmp',
          children: [
            { title: '12214124-log' },
            { title: 'drag-disabled-file', dragDisabled: true },
          ],
        },
        {
          title: 'build',
          children: [{ title: 'react-sortable-tree.js' }],
        },
        {
          title: 'public',
        },
        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },        {
          title: 'node_modules',
        },
      ],
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
    });
  }

  expandAll() {
    this.expand(true);
  }

  collapseAll() {
    this.expand(false);
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n   ');

      global.alert(
        'Info passed to the icon and button generators:\n\n' +
          `node: {\n   ${objectString}\n},\n` +
          `path: [${path.join(', ')}],\n` +
          `treeIndex: ${treeIndex}`
      );
    };

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
          <h3>File Explorer Theme</h3>
          <button onClick={this.expandAll}>Expand All</button>
          <button onClick={this.collapseAll}>Collapse All</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <form
            style={{ display: 'inline-block' }}
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <label htmlFor="find-box">
              Search:&nbsp;
              <input
                id="find-box"
                type="text"
                value={searchString}
                onChange={event =>
                  this.setState({ searchString: event.target.value })
                }
              />
            </label>

            <button
              type="button"
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
            >
              &lt;
            </button>

            <button
              type="submit"
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
            >
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
        </div>

        <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
          <SortableTree
            theme={FileExplorerTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            canDrag={({ node }) => !node.dragDisabled}
//            canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
            canDrop={({ nextParent }) => !nextParent || true }
            generateNodeProps={rowInfo => ({
              icons: [
                    <div
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        marginRight: 10,
                        marginTop: -5,
                        width: 12,
                        height: 16,
                      }}
                    >
                      &bull;
                    </div>,
                  ],
              buttons: [
                <button
                  style={{
                    padding: 0,
                    borderRadius: '100%',
                    backgroundColor: 'gray',
                    color: 'white',
                    width: 16,
                    height: 16,
                    border: 0,
                    fontWeight: 100,
                  }}
                  onClick={() => alertNodeInfo(rowInfo)}
                >
                  i
                </button>,
              ],
            })}
          />
        </div>
      </div>
    );
  }
}

export default App;
