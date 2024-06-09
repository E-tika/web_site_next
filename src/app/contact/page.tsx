const ContactPage = () => {
  const email = "e.doukoukai" + "@" + "gmail.com";
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
      <p className="mb-4">このページは、お問い合わせフォームとして機能します。</p>
      <p className="mb-4">
        メールでのお問い合わせは以下のアドレスまでお願いします：
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline"> {email}</a>
      </p>
      <p className="mb-4">
        また、Googleフォームからのお問い合わせも受け付けています。以下のリンクからフォームにアクセスしてください：
      </p>
      <a
        href="https://forms.gle/example"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Googleフォーム
      </a>
    </div>
  );
}

export default ContactPage;
