import React, { useState } from 'react';
import {gql, useMutation} from '@apollo/client';
import PostModal from "./PostModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert} from "react-bootstrap";

const CREATE_POSTS = gql`
  mutation{
  createPosts{
     id
     title
     href
    body
  }}
`;

const Search = () => {
  const [executeSearch, { data, error, loading }] = useMutation(
    CREATE_POSTS
      , {
          onError: (err) => {
          }
      }
  );

  return (
    <>
      <div>
        <button
          onClick={() =>
            executeSearch(
            )
          }
        >
            Search Posts
        </button>
      </div>
        {error && <Alert  variant="danger">
            <div>{error.message}</div>
            <Alert.Link href="/login">login</Alert.Link>.
        </Alert>}

        {loading && <b>Loading...</b>}
      {data && data.createPosts &&
        data.createPosts.map((post,index) => (
            <>
                <div >
                    <h4>{post.title}</h4>
                <a href={"http://economist.com" + post.href}>
                {post.href}
               </a>
                <div>{post.body}</div>
                </div>
                <PostModal href= {"http://economist.com"  + post.href}/>
                <hr/>
            </>
        ))}
    </>
  )
};

export default Search;
