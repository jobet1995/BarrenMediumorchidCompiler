import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import util from "../../util";
import Service from "./Service";

export default function UserAccountIndex(props) {
  const [userAccounts, setUserAccounts] = useState([]);
  const [paging, setPaging] = useState({
    current: 1,
    size: 1,
    last: 1,
  });
  useEffect(() => {
    util.initView();
  }, []);

  useEffect(() => {
    get();
  }, [props, location]);

  function get() {
    Service.get()
      .then((response) => {
        let query = Util.getQuery();
        setUserAccounts(response.data.userAccounts);
        setPaging({
          current: parseInt(query.page) || 1,
          size: parseInt(query.size) || 10,
          last: response.data.last,
        });
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }
  return (
    <div className="container">
      <div className="col s12">
        <input id="searchbar_toggle" type="checkbox" />
        <div id="searchbar" className="row">
          <div className="col s12 l2">
            <select id="search_col" onChange={() => Util.searchChange()}>
              <option value="UserAccount.id" data-type="number">
                User Account Id
              </option>
              <option value="UserAccount.name">User Account Name</option>
              <option value="UserAccount.email">User Account Email</option>
              <option value="UserAccount.active">User Account Active</option>
            </select>
          </div>
          <div className="col s12 l2">
            <select id="search_oper">
              <option value="c">Contains</option>
              <option value="e">Equals</option>
              <option value="g">&gt;</option>
              <option value="ge">&gt;&#x3D;</option>
              <option value="l">&lt;</option>
              <option value="le">&lt;&#x3D;</option>
            </select>
          </div>
          <div className="col s12 l2">
            <input
              id="search_word"
              autoComplete="off"
              onKeyUp={(event) => Util.search(event)}
            />
          </div>
          <div className="col s12 l6">
            <button className="btn-small" onClick={() => Util.search()}>
              Search
            </button>
            <button
              className="grey btn-small"
              onClick={() => Util.clearSearch()}
            >
              Clear
            </button>
          </div>
        </div>
        <table className="striped highlight">
          <thead>
            <tr>
              <th className={Util.getSortClass("UserAccount.id", "asc")}>
                <Link
                  to={Util.getLink(paging, "sort", "UserAccount.id", "asc")}
                >
                  Id
                </Link>
              </th>
              <th className={Util.getSortClass("UserAccount.name")}>
                <Link to={Util.getLink(paging, "sort", "UserAccount.name")}>
                  Name
                </Link>
              </th>
              <th
                className={
                  Util.getSortClass("UserAccount.email") + " hide-on-small-only"
                }
              >
                <Link to={Util.getLink(paging, "sort", "UserAccount.email")}>
                  Email
                </Link>
              </th>
              <th className={Util.getSortClass("UserAccount.active")}>
                <Link to={Util.getLink(paging, "sort", "UserAccount.active")}>
                  Active
                </Link>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((userAccount, index) => (
              <tr key={index}>
                <td className="center-align">{userAccount.id}</td>
                <td>{userAccount.name}</td>
                <td className="hide-on-small-only">{userAccount.email}</td>
                <td className="center-align">
                  {userAccount.active ? "✓" : "✗"}
                </td>
                <td className="center-align">
                  <Link
                    className="btn-small grey"
                    to={`/userAccount/${userAccount.id}`}
                    title="View"
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                  <Link
                    className="btn-small"
                    to={`/userAccount/edit/${userAccount.id}`}
                    title="Edit"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <Link
                    className="btn-small red"
                    to={`/userAccount/delete/${userAccount.id}`}
                    title="Delete"
                  >
                    <i className="fa fa-times"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col m3 s6">
            <label>
              Show
              <select
                id="page_size"
                onChange={(event) => props.history.push(event.target.value)}
                value={Util.getLink(paging, "size", paging.size)}
              >
                <option value={Util.getLink(paging, "size", 10)}>10</option>
                <option value={Util.getLink(paging, "size", 20)}>20</option>
                <option value={Util.getLink(paging, "size", 30)}>30</option>
              </select>
              entries
            </label>
          </div>
          <div className="col m9 s6">
            <div className="right hide-on-small-only">
              <ul className="pagination">
                <li className={`${paging.current <= 1 ? " disabled" : ""}`}>
                  <Link to={Util.getLink(paging, "page", paging.current - 1)}>
                    Prev
                  </Link>
                </li>
                {Util.getPages(paging.last).map((page) => (
                  <li
                    key={page}
                    className={`${paging.current == page ? " active" : ""}`}
                  >
                    <Link to={Util.getLink(paging, "page", page)}>{page}</Link>
                  </li>
                ))}
                <li
                  className={`${paging.current >= paging.last ? " disabled" : ""}`}
                >
                  <Link to={Util.getLink(paging, "page", paging.current + 1)}>
                    Next
                  </Link>
                </li>
              </ul>
            </div>
            <div className="right hide-on-med-and-up">
              <label>
                {" "}
                Page
                <select
                  id="page_size"
                  onChange={(event) => props.history.push(event.target.value)}
                  value={Util.getLink(paging, "page", paging.current)}
                >
                  {Util.getPages(paging.last).map((page) => (
                    <option
                      key={page}
                      value={Util.getLink(paging, "page", page)}
                    >
                      {page}
                    </option>
                  ))}
                </select>
              </label>{" "}
              of <span>{paging.last}</span>
              <div className="btn-group">
                <Link
                  className={` btn-small${paging.current <= 1 ? " disabled" : ""}`}
                  to={Util.getLink(paging, "page", paging.current - 1)}
                >
                  <i className="fa fa-chevron-left"></i>
                </Link>
                <Link
                  className={` btn-small${paging.current >= paging.last ? " disabled" : ""}`}
                  to={Util.getLink(paging, "page", paging.current + 1)}
                >
                  <i className="fa fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Link className="btn-small" to="/userAccount/create">
          Create
        </Link>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: "#searchbar_toggle_menu { display: inline-flex!important }",
        }}
      />
    </div>
  );
}
