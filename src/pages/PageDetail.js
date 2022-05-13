import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Image, Form, Card, Button } from "react-bootstrap";

const PageDetail = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [comment, setComment] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAllComment();
  }, []);

  const getAllComment = async () => {
    const posts = await axios.get("http://localhost:2020/api/comment/");
    setComment(posts.data);
  };

  useEffect(() => {
    const getOnePost = async () => {
      const { data } = await axios.get(
        `http://localhost:2020/api/post/getPostComment/${id}`
      );
      // console.log(data);

      setTitle(data.title);
      setName(data.name);
      setDescription(data.description);
      setImage(data.image);

      setComment(data.comment);
    };
    getOnePost();
  }, [id]);

  const addCommentHandler = async (e) => {
    e.preventDefault();

    let comment = {
      post_id: id,
      username: username,
      text: text,
    };

    await axios.post(`http://localhost:2020/api/comment/${id}`, comment);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="PageDetail mt-3">
        <div className="title">
          <h2>{title}</h2>
          <h6>
            by : {name} | Des 8, 2021 | Pendidikan | {comment.length} Komentar
          </h6>
        </div>
        <div className="PageDetail-wrapper">
          <Image
            className="imagage"
            src={`http://localhost:2020/${image}`}
            alt=""
          />
          <div className="social-link">
            <p>
              <a
                href="https://www.instagram.com/g2academyindonesia/"
                className="icon-box"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  alt=""
                />
              </a>
            </p>

            <p>
              <a
                href="https://api.whatsapp.com/send?text=Raih%20Beasiswa%20Bootcamp%20G2Academy%20Dan%20Wujudkan%20Impianmu%20https%3A%2F%2Finsights.g2academy.co%2Fg2academy-updates%2Fraih-beasiswa-bootcamp-g2academy%2F"
                className="icon-box"
              >
                <Image
                  src="https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  alt=""
                />
              </a>
            </p>

            <p>
              <a
                href="https://twitter.com/intent/tweet?text=A%20Simple%20Introduction%20to%20Cloud%20Computing&url=https%3A%2F%2Finsights.g2academy.co%2Fg2academy-updates%2Fa-simple-introduction-to-cloud-computing%2F"
                className="icon-box"
              >
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBgiEFoK2MpvDZf6xCSwZ0v5hMoC4aQ8qzeaCZK8tKCB6EDKR08LfV-fVcq-P3W1HdVXw&usqp=CAU"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  alt=""
                />
              </a>
            </p>

            <p>
              <a
                href="https://www.facebook.com/g2academygeeks?_rdc=2&_rdr"
                className="icon-box"
              >
                <Image
                  src="https://www.facebook.com/images/fb_icon_325x325.png"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                  alt=""
                />
              </a>
            </p>
          </div>
          <div
            className="post__description mt-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <br />
        <div className="coment">
          <h4>Kirim Komentar </h4>
          <p>
            Alamat email Anda tidak akan dipublikasikan. Bidang yang harus diisi
            ditandai *
          </p>
          <Card>
            <Form onSubmit={addCommentHandler}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                required
              >
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tambahkan Komentar Anda"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Simpan nama, email, dan situs web saya di browser ini untuk komentar saya berikutnya."
                  feedback="Anda harus setuju sebelum mengirimkan."
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button type="submit">Kirim Komentar</Button>
            </Form>
          </Card>
          <br />

          <div className="coment">
            <h4>{comment.length} Komentar</h4>

            <Card>
              {comment.length > 0 ? (
                comment.map((comments, index) => {
                  return (
                    <div key={index}>
                      <h5>{comments.username}</h5>
                      <p>{comments.text}</p>
                    </div>
                  );
                })
              ) : (
                <p>Belum ada komentar</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
