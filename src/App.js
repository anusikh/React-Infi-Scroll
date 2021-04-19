import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "10px",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, setIsNext] = React.useState(true);
  let [pageCount, setPageCount] = React.useState(1);
  let [count, setCount] = React.useState(0);

  const fetchData = () => {
    if (isNext) {
      axios
        .get(`https://picsum.photos/v2/list?page=${pageCount}&limit=${count}`)
        .then((response) => {
          setResponseData([...responseData, ...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  function fetchMoreData() {
    setPageCount(pageCount + 1);
    setCount(10);
    if (pageCount > 10) {
      setIsNext(false);
    }
    fetchData();
  }

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line
  }, []);

  console.log("h2h", responseData.length);
  console.log("h2h1", isNext);
  return (
    <div className="App" style={{ background: "black" }}>
      <h1
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        {" "}
        PICSUM
      </h1>

      <TableContainer component={Paper}>
        <InfiniteScroll
          dataLength={responseData.length}
          next={fetchMoreData}
          hasMore={isNext}
          loader={
            <div
              style={{
                height: "80%",
                paddingLeft: "50%",
                paddingTop: "10px",
                overflow: "hidden",
              }}
            >
              <CircularProgress />
            </div>
          }
        >
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">ID</StyledTableCell>
                <StyledTableCell align="right">AUTHOR</StyledTableCell>
                <StyledTableCell align="right">HEIGHT</StyledTableCell>
                <StyledTableCell align="right">WIDTH</StyledTableCell>
                <StyledTableCell align="right">URL</StyledTableCell>
                <StyledTableCell align="right">IMAGE</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {responseData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{data.id}</TableCell>
                  <TableCell align="right">{data.author}</TableCell>
                  <TableCell align="right">{data.height}</TableCell>
                  <TableCell align="right">{data.width}</TableCell>
                  <TableCell align="right">{data.url}</TableCell>
                  <TableCell align="right">
                    <img
                      src={data.download_url}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                      alt="No_Image"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
    </div>
  );
}

export default App;
