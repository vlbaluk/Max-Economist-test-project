import React, { useState } from 'react';
import {gql, useQuery} from '@apollo/client';
import {Button,Modal} from "react-bootstrap";
const GET_POST_DETAILS = gql`
    query ParsePost($href:String!){
        parsePost(href: $href){
            title
            body
        }}
`;

const PostModal = ({ href }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {loading, error, data} = useQuery(GET_POST_DETAILS,
        {variables:{href:href+''}})

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Parse
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{data && data.parsePost.title}</Modal.Title>
                </Modal.Header>
                {error && <b>{error}</b>}
                <Modal.Body>{data && data.parsePost.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostModal;