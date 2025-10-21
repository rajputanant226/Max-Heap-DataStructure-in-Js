class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    bubbleUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.heap[currentIndex] > this.heap[parentIndex]) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    sinkDown(index) {
        let currentIndex = index;
        const lastIndex = this.heap.length - 1;

        while (true) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);
            let swapIndex = null;

            if (leftChildIndex <= lastIndex) {
                if (this.heap[leftChildIndex] > this.heap[currentIndex]) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex <= lastIndex) {
                if (
                    (swapIndex === null && this.heap[rightChildIndex] > this.heap[currentIndex]) ||
                    (swapIndex !== null && this.heap[rightChildIndex] > this.heap[swapIndex])
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) {
                break;
            }

            this.swap(currentIndex, swapIndex);
            currentIndex = swapIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        this.swap(0, this.heap.length - 1);
        const maxValue = this.heap.pop();
        this.sinkDown(0);
        return maxValue;
    }

    peek() {
        return this.heap.length === 0 ? null : this.heap[0];
    }
}

// Test
const maxheap = new MaxHeap();
maxheap.insert(12);
maxheap.insert(40);
maxheap.insert(25);
maxheap.insert(50);
maxheap.insert(60);
maxheap.insert(30);
maxheap.insert(35);
maxheap.insert(70);
maxheap.insert(65);

let nextMax;
while (maxheap.size() > 0) {
    nextMax = maxheap.extractMax();
    console.log('Extracted Value: ' + nextMax + ' | New Root: ' + maxheap.peek());
}
