class Node {
  constructor() {
    this.links = new Array(26);
    this.flag = false;
  }

  containsKey(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] !== undefined;
  }

  put(ch, node) {
    this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] = node;
  }

  get(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)];
  }

  setEnd() {
    this.flag = true;
  }

  isEnd() {
    return this.flag;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let curNode = this.root;
    for (let char of word) {
      if (!curNode.containsKey(char)) {
        const newNode = new Node();
        curNode.put(char, newNode);
      }
      curNode = get(char);
    }
    curNode.setEnd();
  }

  search(word) {
    let curNode = this.root
    for (let char of word) {
      if (!curNode.containsKey(char)) {
        return false;
      }
      curNode = get(char);
    }
    return curNode.isEnd()
  }
}
