#include <vector>
#include <iostream>
using namespace std;

class Stack {
public:
    vector<int> stack_;
    Stack() {};
    void push(int n) {
        stack_.push_back(n);
    }
    int pop() {
        int res = stack_[stack_.size() - 1];
        stack_.pop_back();
        return res;
    }
};
int main() {
    Stack s;
    s.push(10);
    cout << "pop after pushing  " << s.pop() << endl;
    s.push(1);
    return 0;
}