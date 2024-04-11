### CRUD

```
kubectl run ngnix --image=nginx
kubectl get pods -o wide
kubectl delete pod webapp
kubectl describe pod nginx 
kubectl create -f ngnix.yaml
kubectl replace -f ngnix.yaml
kubectl run redis --image=redis123 --dry-run=client -o yaml > redis.yaml //get yaml file
kubectl edit rs ngnix
kubectl get all
kubectl explain replicaset
kubectl get pod app-proposal -o yaml
kubectl exec pod/proposal-dply-646458dcb9-m458q -- whoami
```

### Pods

```
kubectl get pods
kubectl describe pod nginx 
kubectl get pods -o wide
kubectl delete pod webapp
kubectl run redis --image=redis123 --dry-run=client -o yaml > redis.yaml //get yaml file
kubectl create -f redis.yaml

```

### ReplicaSets

```
kubectl get replicaset
kubectl create -f replicaset-definination.yaml
kubectl replace -f replicaset-definination.yaml
kubectl delete replicaset webapp
kubectl scale --replica=6 -f replicaset-definination.yaml
kubectl edit rs new-replica-set
```

### deployment

```
kubectl get deployments
kubectl create deployment httpd-frontend --image=httpd:2.4alpine --replicas=3
```

### namespace

```
kubectl get pods --namespace=dev
kubectl get pods --all-namespaces
kubectl config set-context $(kubectl config current-context) --namespace=prod
```

### configmap

```
kubectl create configmap \
    app-config --from-literal=APP_COLOR=blue
```


### rollout

```
kubectl create -f deply.yml --recordw
kubectl rollout status deployment/proposal-dply
kubectl rollout history deployment/proposal-dply //to see the status of the revision
kubectl rollout undo deployment/proposal-dply
```


