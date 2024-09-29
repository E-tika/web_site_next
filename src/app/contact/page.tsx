const ContactPage = () => {
  const email = "e.doukoukai" + "@" + "gmail.com";
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
      <p className="text-red-500 mb-4s">
        試験過去問の会員登録についてのお問い合わせには、必ず入学年度を明記してください。
      </p>
      <p className="mb-4">
        メールでのお問い合わせは以下のアドレスまでお願いします：
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline"> {email}</a>
      </p>
      <p className="mb-4">
        また、Googleフォームからのお問い合わせも受け付けています。以下のフォームからお願いします。
      </p>
      <div className="w-full overflow-hidden">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeLQsA-Cf1ihAa0MCDfurhkrpSyIWCvKcI7_arU16guu7Ha-g/viewform?embedded=true" className="w-full h-[500px] sm:h-[1000px]"
          title="Google Form"
        >
          読み込んでいます…
        </iframe>
      </div>
    </div>
  );
}

export default ContactPage;
