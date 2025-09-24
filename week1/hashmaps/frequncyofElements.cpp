#include <bits/stdc++.h>
using namespace std;

void freq(vector<int> a){
    unordered_map<int,int> mp;
    for(int i=0;i<a.size();i++){
        mp[a[i]]++;
    }
    for(auto x: mp){
        cout<<x.first<<" -> "<<x.second<<"\n";
    }
}

int main(){
    vector<int> v = {1,2,2,3,1,4,2,3};
    freq(v);
}
