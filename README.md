<p align="center">
  <a href="https://alxwrd.github.io/bus-stop">
    <img src="https://i.imgur.com/FjWSR99.png" width="75%">
  </a>
</p>

# Barton bus stop

A single page to display bus times for a single stop, in the style of the
live time boards.


## 🐳 Docker

```
docker build -t bus-stop .
docker container run --publish 8000:80 --detach --name bus-stop bus-stop
```

