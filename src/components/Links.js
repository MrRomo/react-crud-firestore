import React, { useEffect, useState } from "react";
import LinksForm from "./LinksForm";

import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm('are you sure you want to delete this link?')) {
      await db.collection('links').doc(id).delete();
      console.log('deleted link')
    }
  }

  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        setCurrentId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <LinksForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >close</i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url}>Go to Website</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;