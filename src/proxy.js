import { createProxyMiddleware } from "http-proxy-middleware";

export default (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://wwww.omdbapi.com",
            changeOrigin: true,
            pathRewrite: {
                '^api' : ''
            }
        })
    )
}