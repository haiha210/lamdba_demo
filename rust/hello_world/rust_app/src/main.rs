use lambda_http::{service_fn, tower::ServiceBuilder, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .with_target(false)
        .with_ansi(false)
        .without_time()
        .init();

    let handler = ServiceBuilder::new().service(service_fn(func));

    lambda_http::run(handler).await?;
    Ok(())
}

async fn func(_: Request) -> Result<Response<Body>, Error> {
    let resp = Response::builder()
        .status(200)
        .header("content-type", "application/json")
        .body("{\"message\": \"Hello world\"}".into())
        .map_err(Box::new)?;

    Ok(resp)
}
