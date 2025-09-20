#include <iostream>
using namespace std;
class ListNode {
public:
    int val_;
    ListNode* next = nullptr;

    ListNode(int val) {
        val_ = val;
    }
};

class LinkedList {
public:
    ListNode* head;
    ListNode* tail;

    LinkedList() {
        head = new ListNode(-1);
        tail = head;
    }

    void insertEnd(int val) {
        tail->next = new ListNode(val);
        tail = tail->next;
    }

    void remove(int index) {
        int i = 0;
        ListNode* curr = head;
        while (i < index && curr) {
            i++;
            curr = curr->next;
        }
        
        if (curr) {
            curr->next = curr->next->next;
        }
    }

    void print() {
        ListNode* curr = head->next;
        while (curr) {
            cout << curr->val_ << " - ";
            curr = curr->next;
        }
        cout << endl;
    }
};   
