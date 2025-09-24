#include <iostream>
using namespace std;
class ListNode {
public:
    int val_;
    ListNode* next = nullptr;
    ListNode* prev = nullptr;

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
        tail = new ListNode(-1);
        head->next = tail;
        tail->prev = head;
    }

    void insertFront(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->prev = head;
        newNode->next = head->next;

        head->next->prev = newNode;
        head->next = newNode;
    }

    void insertEnd(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = tail;
        newNode->prev = tail->prev;

        tail->prev->next = newNode;
        tail->prev = newNode;
    }


    void removeFront() {
        head->next->next->prev = head;
        head->next = head->next->next;
    }


    void removeEnd() {
        tail->prev->prev->next = tail;
        tail->prev = tail->prev->prev;
    }

    void print() {
        ListNode* curr = head->next;
        while (curr != tail) {
            cout << curr->val_ << " -> ";
            curr = curr->next;
        }
        cout << endl;
    }
};   
int main() {
    LinkedList list;
    list.insertFront(10);
    list.print();        
    list.insertEnd(20);
    list.print();          
    return 0;
}