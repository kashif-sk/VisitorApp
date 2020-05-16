package com.visitor;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootUpReceiver extends BroadcastReceiver {
@Override
public void onReceive(Context context, Intent intent) {
    if(intent.getAction() == Intent.ACTION_BOOT_COMPLETED){
        context.startService(new Intent(context, VisitorService.class));
    }

}
}
