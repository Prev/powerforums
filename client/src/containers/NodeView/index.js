import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import ForumComponent from './forumComponent';
import TopicComponent from './topicComponent';
import * as actions from './actions';

const ROOT_FORUM_ID = '000000000000000000000000';

class NodeView extends Component {
    constructor(props) {
        super(props);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handleChildEvent = this.handleChildEvent.bind(this);
    };

    _loadFromRouteParam() {
        // If component was mounted through /nodelist/:nodeId route, use that param.
        // Otherwise, component was mounted through / route, use ROOT_FORUM_ID constant.
        let nodeId = this.props.match.params.hasOwnProperty('nodeId') ?
            this.props.match.params.nodeId :
            ROOT_FORUM_ID;

        console.log(nodeId);

        this.props.setNodeId(nodeId);
        this.props.load();
    }

    componentDidMount() {
        this._loadFromRouteParam();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location)
            this._loadFromRouteParam();
    }

    handlePaginationChange(newPagination) {
        this.props.changePagination(newPagination);
        this.props.load();
    }

    handleChildEvent(eventType, nodeId, values=null) {
        console.log(eventType);
        console.log(nodeId);
        if (values)
            console.log(values);

        switch (eventType) {
            case 'UPDATE':
                this.props.updateNode({...values, ...{_id: nodeId}});
                break;

            case 'DELETE':
                this.props.deleteNode(nodeId);
                break;

            default:
                alert('Unhandled event:\n' + eventType + ':' + nodeId);
        }
    }

    render() {
        const {loading, loaded, node, children, pagination, error} = this.props;

        if (loading)
            return <Loading />;
        if (error)
            return (
                <div className="container">
                    <ErrorMessage error={error} />
                    <button onClick={() => location.reload()}>Reload</button>
                </div>
            );
        if (!loaded)
            // Unknown state
            return <div />;


        switch (node.type) {
            case 'Forum':
                return (
                    <ForumComponent node={node}
                                    children={children}
                                    pagination={pagination}
                                    onPaginationChange={this.handlePaginationChange}
                                    onChildEvent={this.handleChildEvent} />
                );

            case 'Topic':
                return (
                    <TopicComponent node={node}
                                    children={children}
                                    pagination={pagination}
                                    onPaginationChange={this.handlePaginationChange}
                                    onChildEvent={this.handleChildEvent} />
                );

            default:
                return <ErrorMessage error={{message: 'Invalid node type'}} />;
        }
    }
}

const mapStateToProps = state => ({
    loading: state.nodeView.loading,
    loaded: state.nodeView.loaded,
    node: state.nodeView.node,
    children: state.nodeView.children,
    pagination: state.nodeView.pagination,
    error: state.nodeView.error,
});

const mapDispatchToProps = dispatch => ({
    changePagination: (newPagination) => {
        dispatch(actions.changePagination(newPagination));
    },
    setNodeId: (nodeId) => {
        dispatch(actions.setNodeID(nodeId));
    },
    load: () => {
        dispatch(actions.fetch());
    },
    updateNode: (node) => {
        dispatch(actions.updateNode(node));
    },
    deleteNode: (node) => {
        dispatch(actions.deleteNode(node));
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (NodeView);