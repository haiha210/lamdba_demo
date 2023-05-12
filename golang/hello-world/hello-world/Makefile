.PHONY: build-HelloWorldFunction

build-HelloWorldFunction:
	rm -rf bin/
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o bin/main main.go
	mkdir $(ARTIFACTS_DIR)/bin/
	cp bin/* $(ARTIFACTS_DIR)/bin/
