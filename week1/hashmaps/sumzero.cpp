#include <bits/stdc++.h>
using namespace std;

bool zeroSum(vector<int> a) {
    unordered_map<int,int> mp;
    int s = 0;
    for(int i=0;i<a.size();i++){
        s += a[i];
        if(s==0 || mp.find(s)!=mp.end() || a[i]==0){
            return true;
        }
        mp[s] = 1;
    }
    return false;
}

int main(){
    vector<int> v = {4,2,-3,1,6};
    if(zeroSum(v)) cout<<"yes";
    else cout<<"no";
}
