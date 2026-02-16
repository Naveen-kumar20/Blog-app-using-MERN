import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const truncate = (text, length = 120) => {
  if (!text) return "";
  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};


const blogEmailTemplate = (blog) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>${blog.title}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; font-family: Arial, sans-serif;">

              <!-- Header -->
              <tr>
                <td style="padding:20px; text-align:center; background:#111827; color:#ffffff;">
                  <h1 style="margin:0; font-size:22px;">📝 New Blog Published</h1>
                </td>
              </tr>

              <!-- Blog Image -->
              <tr>
                <td style="padding:20px;">
                  <img 
                    src="${blog.image}" 
                    alt="${blog.title}" 
                    width="100%" 
                    style="border-radius:6px; display:block;"
                  />
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding:20px;">
                  <h2 style="margin:0 0 10px; color:#111827;">
                    ${blog.subTitle}
                  </h2>

                  <p style="margin:0 0 15px; color:#4b5563; font-size:14px; line-height:1.6;">
                    ${truncate(blog.description, 130)}
                  </p>

                  <a 
                    href="${process.env.FRONTEND_URL_FOR_NODEMAILER}/blog/${blog._id}"
                    style="
                      display:inline-block;
                      padding:10px 18px;
                      background:#2563eb;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:4px;
                      font-size:14px;
                    "
                  >
                    Read Full Blog →
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
                  You are receiving this email because you subscribed to HeartNote Blog.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};


export const sendNewBlogEmail = async(allEmails, blog)=>{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: allEmails,
        subject: blog.title + '(latest blog)',
        html: blogEmailTemplate(blog),
    })
}