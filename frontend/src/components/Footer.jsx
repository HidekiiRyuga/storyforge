function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 StoryForge. Built with MERN.</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "60px",
    padding: "20px",
    textAlign: "center",
    borderTop: "1px solid #222",
    color: "#777",
  },
};

export default Footer;
