### command and arguments
`

apiVersion: v1 
kind: Pod 
metadata:
  name: ubuntu-sleeper-2 
spec:
  containers:
  - name: ubuntu
    image: ubuntu
    command: ["sleep", "5000"]
    arg: ["2000"]
`

here the command represent entrypoint and docker and arg represent cmd in docker

###env


